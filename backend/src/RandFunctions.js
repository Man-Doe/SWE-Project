function RandFunctions() {
    return Object.freeze({
        generateRandomInclusive: function(floor, ceiling) {
            return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
        },
        generateListRandom: function(floor, ceiling, amount) {
            if (amount > (ceiling - floor + 1) || amount < 0) throw {message: "Invalid amount"};
            var result = [];
            var i = 0;
            var randNum;
            while (i < amount) {
                randNum = this.generateRandomInclusive(floor,ceiling);
                while (result.includes(randNum)) {randNum = this.generateRandomInclusive(floor,ceiling)};
                result.push(randNum);
                i++;
            }
            return result;
        }
    })
}


module.exports = RandFunctions;
