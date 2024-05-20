import apiBackendUrl from "../../lib/axios";
import { JobType } from "types/JobsTypes";

const userId : string = "6644b816b732651683c01b26" 

const getMyJobs = async (): Promise<JobType[]> => {
  try {
      const response = await apiBackendUrl.get(`/users/myJobs/${userId}`);
      const jobs: JobType[] = response.data.detail.reverse();
      return jobs;
  } catch (error) {
      console.error('Error al obtener los trabajos:', error);
      return []; 
  }
};


export default getMyJobs;

