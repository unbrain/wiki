import { ref, watch } from 'vue'
import type { CVData } from '../types/cv'
import { PRESETS } from '../data/presets'
import { normalizeCvData } from '../data/normalizer'

export function useResume() {
  // Read initial dataset key from URL query param (default to unbrain_full)
  const urlParams = new URLSearchParams(window.location.search)
  const queryPreset = urlParams.get('data') || 'unbrain_full'
  const initialKey = PRESETS[queryPreset] ? queryPreset : 'unbrain_full'

  const activePresetKey = ref<string>(initialKey)
  const cv = ref<CVData>(JSON.parse(JSON.stringify(PRESETS[initialKey])))
  const isEditing = ref<boolean>(false)
  const toast = ref<string>('')

  let toastTimer: any = null
  function showToast(msg: string) {
    toast.value = msg
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toast.value = ''
    }, 2800)
  }

  function loadPreset(key: string) {
    if (PRESETS[key]) {
      activePresetKey.value = key
      cv.value = JSON.parse(JSON.stringify(PRESETS[key]))
      // Sync URL
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set('data', key)
      window.history.replaceState(null, '', newUrl.toString())
      showToast(`已载入: ${PRESETS[key].label || key}`)
    }
  }

  function importJson(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const raw = JSON.parse(e.target?.result as string)
          const normalized = normalizeCvData(raw)
          cv.value = normalized
          activePresetKey.value = 'imported'
          showToast(`成功导入并渲染: ${normalized.label || normalized.person.nameCn || '自定义简历'}`)
          resolve(true)
        } catch (err: any) {
          showToast(`导入失败: ${err.message || '格式错误'}`)
          reject(err)
        }
      }
      reader.onerror = () => reject(new Error('文件读取失败'))
      reader.readAsText(file)
    })
  }

  function exportJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cv.value, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `cv-data-${activePresetKey.value}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    showToast('已导出 JSON 简历配置文件！')
  }

  function replacePhoto(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          cv.value.person.photo = result
          cv.value.person.photoFit = 'cover'
          showToast('形象照片已更换！')
          resolve(result)
        } else {
          reject(new Error('读取照片失败'))
        }
      }
      reader.onerror = () => reject(new Error('文件读取错误'))
      reader.readAsDataURL(file)
    })
  }

  function toggleEdit() {
    isEditing.value = !isEditing.value
    showToast(isEditing.value ? '已开启在线编辑，点击文字可直接修改！' : '编辑已完成。')
  }

  function resetToPresetDefaults() {
    loadPreset(activePresetKey.value)
    showToast('已恢复为当前预设初始数据！')
  }

  return {
    activePresetKey,
    cv,
    isEditing,
    toast,
    showToast,
    loadPreset,
    importJson,
    exportJson,
    replacePhoto,
    toggleEdit,
    resetToPresetDefaults
  }
}
