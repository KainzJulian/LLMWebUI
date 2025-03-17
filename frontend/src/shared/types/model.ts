export class ModelArray {
  models: Model[];

  constructor(data: Partial<ModelArray> = {}) {
    this.models = data.models || [];
  }
}

export class Model {
  id: string;
  model: string;
  modified_at: Date;
  size: number;
  digest: string;
  details: ModelDetails;

  constructor(data: Partial<Model> = {}) {
    this.id = data.id || '';
    this.model = data.model || '';
    this.modified_at = data.modified_at || new Date();
    this.size = data.size || 0;
    this.digest = data.digest || '';
    this.details = new ModelDetails(data.details);
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
