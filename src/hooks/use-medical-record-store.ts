import { MedicalRecordType } from "@/types";
import { create } from "zustand";

// export type ModalType = "createActor";

interface MedicalRecordStore {
  medicalRecords: MedicalRecordType[] | null;
  setMedicalRecords(medicalRecords: MedicalRecordType[]): void;
  addMedicalRecord: (medicalRecord: MedicalRecordType) => void;
  updateMedicalRecord: (medicalRecord: MedicalRecordType) => void;
  removeMedicalRecord: (medicalRecordId: number) => void;
}

export const useMedicalRecordStore = create<MedicalRecordStore>((set) => ({
  medicalRecords: null,
  setMedicalRecords: (medicalRecords: MedicalRecordType[]) => set({ medicalRecords }),
  addMedicalRecord: (medicalRecord: MedicalRecordType) =>
    set((state) => {
      return {
        medicalRecords: state.medicalRecords ? [...state.medicalRecords, medicalRecord] : [medicalRecord],
      };
    }),
  updateMedicalRecord: (medicalRecord: MedicalRecordType) =>
    set((state) => {
      const filteredMedicalRecords = state.medicalRecords?.filter(
        (temp) => temp.recordId !== medicalRecord.recordId
      );
      return {
        medicalRecords: filteredMedicalRecords ? [...filteredMedicalRecords, medicalRecord] : [medicalRecord],
      };
    }),
  removeMedicalRecord: (medicalRecordId: number) =>
    set((state) => {
      const filteredMedicalRecords = state.medicalRecords?.filter(
        (medicalRecord) => medicalRecord.recordId !== medicalRecordId
      );
      return {
        medicalRecords: filteredMedicalRecords || [],
      };
    }),
}));
