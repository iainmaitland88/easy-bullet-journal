export type TaskJSON = {
  id: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class Task {
  readonly id: string;
  readonly description: string;
  readonly completed: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(
    description: string,
    completed: boolean,
    id: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(description: string, completed = false): Task {
    const createdAt = new Date();
    const updatedAt = createdAt;
    return new Task(description, completed, crypto.randomUUID(), createdAt, updatedAt);
  }

  toggleCompleted(): Task {
    return new Task(
      this.description,
      !this.completed,
      this.id,
      this.createdAt,
      new Date(),
    );
  }

  toJSON(): TaskJSON {
    return {
      id: this.id,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data: TaskJSON): Task {
    return new Task(
      data.description,
      data.completed,
      data.id,
      data.createdAt,
      data.updatedAt,
    );
  }
}
