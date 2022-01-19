
const useGenras = (selectedGeneras) => {
    if(selectedGeneras.length < 1) return "";
    const genraIds = selectedGeneras.map( (genra) => genra.id);
    return genraIds.reduce( (accumulator, currentValue) => accumulator + "," + currentValue);
}

export default useGenras;