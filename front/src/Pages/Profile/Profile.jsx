import { Heading,SkeletonCircle,SkeletonText } from "@chakra-ui/react";
import style from "./profile.module.css";

export function Profile() {

    return (<div>
        <Heading>Hello , username</Heading>
        <div className={style.userProfile}>
            {/* <SkeletonCircle size="40" m="auto"/>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='4' /> */}
            <img src='https://bit.ly/sage-adebayo' alt="profile image"/>
            <div>
                <div>John Doe</div>
            </div>
        </div>
    </div>)
}