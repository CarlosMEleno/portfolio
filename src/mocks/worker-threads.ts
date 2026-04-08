// Browser stub for Node.js 'worker_threads' module
// Required by wavesurfer.js spectrogram plugin when bundled with Vite

export class Worker {
  constructor(_scriptPath: string) {}
  postMessage(_value: unknown) {}
  terminate(): Promise<number> { return Promise.resolve(0) }
  on(_event: string, _listener: (...args: unknown[]) => void) { return this }
  once(_event: string, _listener: (...args: unknown[]) => void) { return this }
  off(_event: string, _listener: (...args: unknown[]) => void) { return this }
}

export const isMainThread = true
export const parentPort = null
export const workerData = undefined
