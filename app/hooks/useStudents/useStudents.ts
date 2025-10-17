import api from "@/app/services/api/api";
import { useQuery } from "@tanstack/react-query";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await api.get("/get-all-students");
      return data;
    },
  });
}
