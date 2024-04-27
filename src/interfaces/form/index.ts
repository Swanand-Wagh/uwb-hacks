export interface IControlErrorMessage {
  message: string;
}

export interface IFormControlErrors {
  content?: IControlErrorMessage;
  tutor?: IControlErrorMessage;
}

export interface ICurrentFormProperties {
  content: { value: string };
  tutor: { value: string };
  reset: () => void;
}
