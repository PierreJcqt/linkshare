<template>
    <div class="page-container">
        <b-container fluid>
            <b-row class="text-center justify-content-center">
                <b-col cols="12" lg="4">
                    <b-card
                        class="account-card border-0 shadow p-3 mb-5 mt-3 mr-5 bg-white rounded"
                    >
                        <div class="pt-sm-3 pt-lg-0">
                            <b-card-text class="login-text h4"
                                >S'inscrire</b-card-text
                            >
                            <b-form>
                                <b-form-group>
                                    <b-form-input
                                        id="firstName"
                                        type="text"
                                        placeholder="Prénom"
                                        v-model="input.firstName"
                                        class="account-input text-dark mb-2 mt-4 pl-3 w-100"
                                        aria-label="Écrire votre prénom"
                                    ></b-form-input>
                                    <b-form-input
                                        id="lastName"
                                        type="text"
                                        placeholder="Nom"
                                        v-model="input.lastName"
                                        class="account-input text-dark mb-2 pl-3 w-100"
                                        aria-label="Écrire votre nom"
                                    ></b-form-input>
                                    <b-form-input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        v-model="input.email"
                                        class="account-input text-dark mb-2 pl-3 w-100"
                                        aria-label="Écrire votre adresse mail"
                                    ></b-form-input>
                                    <b-form-input
                                        id="role"
                                        type="text"
                                        placeholder="Fonction"
                                        v-model="input.role"
                                        class="account-input text-dark mb-2 pl-3 w-100"
                                        aria-label="Renseignez votre fonction ici"
                                    ></b-form-input>
                                    <b-form-input
                                        id="password"
                                        type="password"
                                        placeholder="Mot de passe"
                                        v-model="input.password"
                                        class="account-input text-dark mb-2 pl-3 w-100"
                                        aria-label="Écrire votre mot de passe"
                                    ></b-form-input>
                                </b-form-group>

                                <button
                                    v-on:click.stop="signup()"
                                    type="submit"
                                    id="signup-button"
                                    class="btn btn-success mt-3"
                                    aria-label="S'inscrire"
                                >
                                    Inscription
                                </button>
                                <p class="my-3 text-danger">
                                    {{ errorMessage }}
                                </p>
                            </b-form>
                        </div>
                        <div class="line my-3"></div>

                        <p
                            class="font-small grey-text d-flex justify-content-center mb-1"
                        >
                            Vous avez déjà un compte ?
                            <router-link
                                to="/login"
                                class="font-weight-bold ml-1 box-text"
                            >
                                Se connecter</router-link
                            >
                        </p>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import router from '../router/index'
export default {
    name: 'Signup',
    data() {
        return {
            errorMessage: '',
            input: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: ''
            },
        }
    },
    created() {
        this.notyf = new Notyf({
            duration: 5000,
            position: {
                x: 'center',
                y: 'bottom',
            },
        })
    },
    methods: {
        signup() {
            if (
                this.input.firstName != '' &&
                this.input.lastName != '' &&
                this.input.email != '' &&
                this.input.password != '' &&
                this.input.role != ''
            ) {
                apiClient
                    .post('/api/auth/signup', this.input)
                    .then((data) => {
                        if (!data.token) {
                            this.errorMessage = data.error.errors[0].message
                        } else {
                            localStorage.setItem('userToken', data.token)
                            localStorage.setItem(
                                'userData',
                                JSON.stringify(data.user)
                            )
                            router.push({ name: 'Posts' })
                        }
                    })
                    .catch((error) => {
                        if (error.error) {
                            return (this.errorMessage = error.error)
                        }
                        this.$toast.success('Votre compte a bien été crée !');
                        router.push({ name: 'Login' })
                    })
            } else {
                this.errorMessage = 'Veuillez renseigner les informations'
            }
        },
    },
}
</script>

<style lang="scss">
a {
    text-decoration: none;
    color: #2c3e50 !important;
}
.box-text {
    margin-left: 5px;
}
.account-btn {
    background-color: rgba(253, 45, 6, 0.8);
    color: white;
    border-radius: 1rem;
    border: none;
    margin-bottom: 1rem;
    padding: 0.375rem 0.75rem;
    &:hover,
    &:focus,
    &:active {
        background-color: rgb(253, 45, 6);
        color: white;
        outline: none;
    }
}
@media screen and (min-width: 280px) and (max-width: 769px) {
    .account-card {
        .card-body {
            padding: 0.7rem;
        }
    }
    .shadow {
        box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
    }
    .login-text {
        font-size: 1.1rem;
    }
}
</style>
