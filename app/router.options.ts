import type { RouterConfig } from '@nuxt/schema';
import { ERouteName } from "~/app/routeName.enum";

const MainPage = () => import("~/pages/index.vue");
const RacePage = () => import("~/pages/race.vue");
const ClassPage = () => import("~/pages/class.vue");
const BackgroundPage = () => import("~/pages/background.vue");
const WorldviewPage = () => import("~/pages/worldview.vue");
const CharacterPage = () => import("~/pages/character.vue");
const CharacteristicsPage = () => import("~/pages/characteristics.vue");

export default {
    routes: (_routes) => [
        {
            name: ERouteName.Main,
            path: '/',
            component: MainPage,
        },
        {
            name: ERouteName.Race,
            path: '/race',
            component: RacePage,
        },
        {
            name: ERouteName.Class,
            path: '/class',
            component: ClassPage,
        },
        {
            name: ERouteName.Background,
            path: '/class/:id',
            component: BackgroundPage,
        },
        {
            name: ERouteName.Worldview,
            path: '/worldview',
            component: WorldviewPage,
        },
        {
            name: ERouteName.Character,
            path: '/character',
            component: CharacterPage,
        },
        {
            name: ERouteName.Characteristics,
            path: '/characteristics',
            component: CharacteristicsPage,
        },
    ],
} satisfies RouterConfig
