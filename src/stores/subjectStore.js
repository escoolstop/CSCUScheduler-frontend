import { defineStore } from 'pinia';

export const useSubjectStore = defineStore('subjectStore', {
  state: () => ({
    counter: 3
  })
})