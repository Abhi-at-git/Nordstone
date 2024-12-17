import React from "react";
import { SafeAreaView } from "react-native";

import style from "./style";
import { ProfileTabsNavigation } from "../../navigation/MainNavigation";

const Home = () => {
    return(
        <SafeAreaView  style = {style.background}>
            <ProfileTabsNavigation />
        </SafeAreaView>
    )
}

export default Home;