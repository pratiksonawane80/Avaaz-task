export default ($axios) => {
  return {
    getUsersList: async () => {
      return await $axios
        .get(`users?page=1&per_page=100&query=queue_id:4&include=settings&sort=extension:asc`, {
          Authorization: 'Y0hKaGRHbHJjMjl1WVhkaGJtVTRNRUJuYldGcGJDNWpiMjA2TVRBek9tRmtiV2x1T2tGemFXRXZTMjlzYTJGMFlUb3hOamN3TWpFeU5qZ3dNVEkzOg=='
        })
        .then((response) => {
          console.log(response, 'store resppppppppp');
          return response.data
        })
        .catch((e) => {
          return { status: e.response.status, data: e.response.data }
        })
    },

  }
}


// myHeaders.append('Authorization', token)
// myHeaders.append('Cookie', 'JSESSIONID=2A63FECF240218C3A4534092A085F283')
