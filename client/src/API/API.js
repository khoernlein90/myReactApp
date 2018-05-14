import axios from "axios";

export default {
    getData: function(req, res){
        return axios.get("/api/activity")
    }
}