export enum ProjectStatus {
  InProgress = 'In Progress',
  Completed = 'Completed',
  Postponed = 'Postponed',
  Pending = 'Pending'
}


export interface ProjectCard {
  id: string;
  name: string;
  owner: string;
  deadline: string;
  status: ProjectStatus;
}
