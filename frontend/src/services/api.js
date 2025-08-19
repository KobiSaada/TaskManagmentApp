import axios from 'axios';

export const api = {
  list:     (params) => axios.get(`/api/tasks`, { params }).then(r => r.data),
  get:      (id)     => axios.get(`/api/tasks/${id}`).then(r => r.data),
  create:   (data)   => axios.post(`/api/tasks`, data).then(r => r.data),
  update:   (id,d)   => axios.put(`/api/tasks/${id}`, d).then(r => r.data),
  setStatus:(id,s)   => axios.patch(`/api/tasks/${id}/status`, { status: s }).then(r => r.data),
  remove:   (id)     => axios.delete(`/api/tasks/${id}`),
};
