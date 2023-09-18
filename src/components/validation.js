

export default function    valiation(values){
 const errors ={}

;

   if(values.name==" "){
    errors.name="name is required !"
   }

   if(values.password=="")
   {
    errors.password="password is reduired";
   }
   
   return errors;
}
