<template>
    <div>
        <button
            @click="toggleActions"
            class="profile-btn d-flex btn-light position-fixed justify-content-center justify-content-lg-between align-items-center"
            aria-label="Afficher les actions"
        >
            <span class="name-profile-btn d-none d-lg-block">{{
                userData.firstName
            }}</span>
            <ProfileImage
                :src="userData.imageUrl"
                customClass="profile-btn__img"
                divCustomClass="div-profile-btn-img"
            />
        </button>
        <b-collapse
            id="profile-collapsed"
            v-on:clickaway="hideContent"
            v-bind:class="`collapsed mt-2 position-fixed ${
                areActionsVisible && 'visible'
            }`"
            >
            <b-card class="border-0" @click="toggleActions">
                <p class="card-text">
                    <button
                        class="collapsed-btn btn-block text-left"
                        @click="changeOrReloadPage('Profile')"
                        aria-label="Voir mon profil"
                    >
                        <b-icon icon="person" class="mr-2 icon"></b-icon
                        >Paramètres du profil
                    </button>
                </p>
                <p class="card-text">
                    <button
                        class="collapsed-btn btn-block text-left"
                        @click="changeOrReloadPage('Posts')"
                        aria-label="Voir la page d'accueil"
                    >
                        <b-icon icon="house" class="mr-2 icon"></b-icon>Page
                        d'accueil
                    </button>
                </p>
                <p class="card-text">
                    <button
                        class="collapsed-btn btn-block text-left"
                        @click="logout"
                        aria-label="Se déconnecter"
                    >
                        <b-icon
                            icon="box-arrow-right"
                            class="mr-2 icon"
                        ></b-icon>
                        Se déconnecter
                    </button>
                </p>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
import ProfileImage from './ProfileImage'
export default {
    name: 'ProfileButton',
    components: {
        ProfileImage,
    },
    props: {},
    data() {
        return {
            showModal: true,
            showContent: false,
            userData: JSON.parse(localStorage.getItem('userData')),
            areActionsVisible: false,
        }
    },
    mounted() {
        document.body.addEventListener('click', this.bodyClick);
    },
    beforeDestroy() {
        document.body.removeEventListener('click', this.bodyClick);
    },
    methods: {
        toggleActions(event) {
            this.areActionsVisible = !this.areActionsVisible
        },
        hideContent() {
            this.showContent = false
        },
        logout() {
            this.$toast.info('Au revoir et à bientôt sur votre réseau !')
            localStorage.clear()
            this.$router.push({ name: 'Login' })
        },
        changeOrReloadPage(name) {
            if (name === this.$route.name) return window.location.reload()
            this.$router.push({ name })
        },
        bodyClick(event) {
            if (
                !this.$el.contains(event.target) &&
                event.target.className !== 'profile-btn d-flex btn-light position-fixed justify-content-center justify-content-lg-between align-items-center'
            ) {
                this.areActionsVisible = false;
            }
        },
    },
}
</script>

<style lang="scss">
.profile-btn {
    font-weight: 500;
    width: 120px;
    border: none;
    color: #000;
    top: 20px;
    right: 20px;
    height: 45px;
    padding: 5px 5px 5px 16px;
    box-shadow: 0px 1px 1px 1px rgba(204, 204, 204, 0.2);
    background-color: white;
    border-radius: 40px;
    z-index: 2;
    &:focus {
        outline: none;
    }
    &:hover,
    &:visited {
        background-color: white;
    }
    &__img {
        height: 30px;
    }
}
.collapsed-btn {
    font-weight: 500;
    color: #000;
    background-color: white;
    border: none;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    &:hover,
    &:focus,
    &active {
        background-color: rgba(108, 117, 125, 0.1);
        outline: none;
    }
    .b-icon.bi {
        font-size: 125%;
        vertical-align: text-bottom;
    }
}
.icon {
    margin-right: 10px;
}
.div-profile-btn-img {
    width: 30px;
    height: 30px;
    margin-left: 8px;
}
#profile-collapsed {
    top: 62px;
    right: 44px;
    z-index: 9999; 
}
@media screen and (min-width: 280px) and (max-width: 769px) {
    .profile-btn {
        top: 22px;
        right: 20px;
        width: 35px;
        height: 25px;
        padding: 0;
        &__img {
            height: 35px;
        }
    }
    .div-profile-btn-img {
        width: 35px;
        height: 35px;
        margin-left: 0;
    }
    #profile-collapsed {
        top: 45px;
        right: 15px;
    }
}
@media screen and (min-width: 769px) and (max-width: 992px) {
    .name-profile-btn {
        display: block !important;
    }
}
</style>
