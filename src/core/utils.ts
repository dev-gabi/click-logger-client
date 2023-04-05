


    export const removeObjectFromArray = (id:number, array:any[]) => {
        const index = array.findIndex(s=>s.id == id);
        array.splice(index, 1);
      }
