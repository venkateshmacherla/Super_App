import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: null,
      selectedCategories: [],
      notes: "",

      setUser: (user) => set({ user }),

      setSelectedCategories: (categories) =>
        set({ selectedCategories: categories }),
      setNotes: (notes) =>
        set({
          notes,
        }),
    }),
    {
      name: "superapp-storage",
    },
  ),
);

export default useStore;
