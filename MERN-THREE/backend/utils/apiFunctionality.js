class Apifunctionality {
    constructor(query, queryStr) { //mongocall, querystring
        this.query = query,
        this.queryStr = queryStr
    }
    search () {
        const keyword = this.query.keyword?{
            name: {
                $regex: this.queryStr.keyword,
                $option: 'i',
            }
        }: {};
        console.log();
        

        this.query = this.query.find({...keyword})
        return this
    }
}

export default Apifunctionality;