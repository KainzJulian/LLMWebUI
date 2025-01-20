export class ModelArray {
  models: Model[];

  constructor(data: Partial<ModelArray> = {}) {
    this.models = data.models || [];
  }
}

export class Model {
  model: string;
  name: string;
  modified_at: Date;
  size: number;
  digest: string;
  details: ModelDetails;
  expires_at: Date;
  size_vram: number;

  constructor(data: Partial<Model> = {}) {
    this.model = data.model || '';
    this.name = data.name || '';
    this.modified_at = data.modified_at || new Date();
    this.size = data.size || 0;
    this.digest = data.digest || '';
    this.details = new ModelDetails(data.details) || null;
    this.size_vram = data.size_vram || 0;
    this.expires_at = data.expires_at || new Date(0);
  }
}

export class ModelDetails {
  parent_model: string;
  format: string;
  family: string;
  families: string[];
  parameter_size: string;
  quantization_level: string;

  constructor(data: Partial<ModelDetails> = {}) {
    this.parent_model = data.parent_model || '';
    this.format = data.format || '';
    this.family = data.family || '';
    this.families = data.families || [];
    this.parameter_size = data.parameter_size || '';
    this.quantization_level = data.quantization_level || '';
  }
}
