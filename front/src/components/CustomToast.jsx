import { useToast } from "@chakra-ui/react";

export function CustomToast(){
    const toast = useToast();
    const MyToast = (message="something...",status="info",duration=1000,position="top")=>{
        let statuses = ["info","success","warning","error"];

        return toast({
            title: message,
            status: statuses.includes(status)?status:"info",
            duration: typeof(duration)!=="number"?1000:duration,
            isClosable: true,
            position:position
          })
    }
    return {MyToast};
}