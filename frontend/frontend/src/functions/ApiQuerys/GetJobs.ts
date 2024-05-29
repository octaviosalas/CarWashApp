import apiBackendUrl from "../../lib/axios";
import { JobType } from "types/JobsTypes";

const getMyJobs = async (userId: string | undefined): Promise<JobType[]> => {

  if (!userId) {
    console.error('User ID is undefined');
    return [];
  }

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

