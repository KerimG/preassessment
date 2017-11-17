new Vue({
    el: '#app',

    data: {
        pressReleases: []
    },
    
    filters: {
        date: function (date) {
            return moment.unix(date).format("DD.MM.YYYY HH:mm");;
        }
    },

    mounted() {
        axios.get('http://localhost:3000/GetLocalPressReleases')
            .then(response => {
                response.data.forEach(element => {
                    element.source = "local";
                    this.pressReleases.push(element);
                });
                return axios.get('http://localhost:3000/GetGlobalPressReleases')
            })
            .then(response => {
                response.data.forEach(element => {
                    element.source = "global";
                    this.pressReleases.push(element);
                });

                this.pressReleases.sort((x, y) => {
                    return y.timestamp - x.timestamp;
                });
            });
    }
});