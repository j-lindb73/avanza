<template>
  <transition
    :name="transition"
  >
    <div
      v-if="show"
      class="cookie-consent"
      role="dialog"
    >
      <slot
        name="message"
      >
        <span
          class="cookie-consent-message"
        >
          {{ message }}
          <slot
            name="link"
          >
            <a
              v-bind="{ href, target, rel }"
              class="cookie-consent-link"
              role="button"
            >
              {{ linkLabel }}
            </a>
          </slot>
        </span>
      </slot>
      <section
        click="dismiss"
        @click="$emit('update:buttonDisabled', false); dismiss();"
      >
        <slot
          name="button"
        >
          <button
            class="cookie-consent-compliance"
            type="button"
          >
            {{ buttonLabel }}
          </button>
        </slot>
      </section>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'CookieConsent',
    props: {
      // default
      transition: {
        type: String,
        default: 'cookie-consent-transition'
      },
      message: {
        type: String,
        default: 'Chattens meddelande sparas, undvik personuppgifter '
      },
      // button
      linkLabel: {
        type: String,
        default: 'Läs mer'
      },
      buttonLabel: {
        type: String,
        default: 'Jag förstår!'
      },
      href: {
        type: String,
        default: 'https://www.datainspektionen.se/lagar--regler/dataskyddsforordningen/'
      },
      target: {
        type: String,
        default: '_blank'
      },
      rel: {
        type: String,
        default: 'noopener'
      },
      // cookie
      cookieName: {
        type: String,
        default: 'cookieconsent_status'
      },
      cookiePath: {
        type: String,
        default: '/'
      },
      cookieDomain: {
        type: String,
        default: ''
      },
      cookieExpiryDays: {
        type: Number,
        default: 365
      },
      buttonDisabled: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        show: undefined,
      }
    },
    computed: {
      cookie() {
        return !this.getCookie(this.cookieName)
      }
    },
    beforeMount() {
      this.show = this.cookie
    },
    methods: {
      dismiss() {
        this.show = false
        this.setCookie(this.cookieName, 1, this.cookieExpiryDays, this.cookieDomain, this.cookiePath)
      },
      getCookie(name) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        return parts.length !== 2 ?
          undefined :
          parts.pop().split(';').shift()
      },
      setCookie(name, value, expiryDays, domain, path) {
        const exdate = new Date()
        exdate.setDate(exdate.getDate() + (expiryDays || 365))
        const cookie = [
          `${name}=${value}`,
          `expires=${exdate.toUTCString()}`,
          `path=${(path || '/')}`
        ]
        if (domain) {
          cookie.push(`domain=${domain}`)
        }
        document.cookie = cookie.join(';')
      }
    }
  }
</script>

<style scoped>
    .cookie-consent {
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 9999;
    width: 100%;
    padding: 1rem 0;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    background: #42b983;
    }

    .cookie-consent-message,
    .cookie-consent-compliance {
        margin: 0.5rem 1rem;
    }

    .cookie-consent-compliance {
        cursor: pointer;
        color: #fff;
        padding: .5rem 2rem;
        background: #42b983;
        border: 2px solid currentColor;
    }
    
    .cookie-consent-transition-leave-active {
        transition: transform .75s;
        transition-timing-function: cubic-bezier(.75,0,0,1);
    }

    .cookie-consent-transition-leave-to {
        transform: translateY(100%);
    }


</style>