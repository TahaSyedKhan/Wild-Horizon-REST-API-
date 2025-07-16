export const sendDataFromPathParam = (data, locationType, locationName) => {
    return data.filter(destination => 
            destination[locationType].toLowerCase() === locationName.toLocaleLowerCase()
        )
}