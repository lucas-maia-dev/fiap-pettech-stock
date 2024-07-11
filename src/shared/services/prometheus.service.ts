import { Injectable } from '@nestjs/common'

import * as prometheus from 'prom-client'

@Injectable()
export class PrometheusService {
  private httpRequestDurationMicroseconds: prometheus.Histogram<'route'>

  constructor() {
    this.httpRequestDurationMicroseconds = new prometheus.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP request in microseconds',
      labelNames: ['route'],
      buckets: [0.1, 1, 2, 3, 4, 5],
    })
  }

  get sendMetrics() {
    return this.httpRequestDurationMicroseconds
  }
}
