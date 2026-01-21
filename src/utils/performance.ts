/**
 * Performance monitoring utility for tracking FPS and processing times
 */
class PerformanceMonitor {
  private frameCount: number = 0;
  private lastTime: number = Date.now();
  private fps: number = 0;
  private processingTimes: number[] = [];
  private maxSamples: number = 60;

  /**
   * Record a new frame
   */
  recordFrame(): void {
    this.frameCount++;
    const now = Date.now();
    
    if (now - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
    }
  }

  /**
   * Record processing time for a frame
   */
  recordProcessingTime(time: number): void {
    this.processingTimes.push(time);
    if (this.processingTimes.length > this.maxSamples) {
      this.processingTimes.shift();
    }
  }

  /**
   * Get current FPS
   */
  getFPS(): number {
    return this.fps;
  }

  /**
   * Get average processing time
   */
  getAverageProcessingTime(): number {
    if (this.processingTimes.length === 0) {
      return 0;
    }
    const sum = this.processingTimes.reduce((a, b) => a + b, 0);
    return sum / this.processingTimes.length;
  }

  /**
   * Get performance statistics
   */
  getStats(): {
    fps: number;
    avgProcessingTime: number;
    minProcessingTime: number;
    maxProcessingTime: number;
  } {
    const hasData = this.processingTimes.length > 0;
    return {
      fps: this.fps,
      avgProcessingTime: this.getAverageProcessingTime(),
      minProcessingTime: hasData ? Math.min(...this.processingTimes) : 0,
      maxProcessingTime: hasData ? Math.max(...this.processingTimes) : 0,
    };
  }

  /**
   * Reset all statistics
   */
  reset(): void {
    this.frameCount = 0;
    this.lastTime = Date.now();
    this.fps = 0;
    this.processingTimes = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();
