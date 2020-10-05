

# Vue - VueX

September 2020

\> 🔨 From Udemy '[Devenir opérationnel rapidement en Vue et Vuex](https://www.udemy.com/course/devenir-operationnel-rapidement-en-vue-et-vuex/)'

\* * *

![vuex-logo](_readme-img/vuex-logo.jpeg)



## Vue main concepts

### What is vue?

- Vue (or Vue.js) is an open-source front-end JavaScript framework
- Vue is the **view** layer of an MVC application (Model View Controller)
- Vue is currently [one of the most popular](https://github.com/vuejs/vue) JavaScript libraries/frameworks
- Unlike other popular JavaScript projects, Vue is not backed by a large corporation like React (Facebook) or Angular (Google). Vue was originally written by [Evan You](https://github.com/yyx990803) and the open-source community.

### Tools

For browser:

- [Vue DevTools on Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
- [Vue DevTools on FireFox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

For IDE:

- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)

vbase

vimport

vmethod

vdata

...

You will need [Vue CLI](https://cli.vuejs.org/).

`vue create my-project`

Select your options automatic or manual (then select features: eslint, vuex...)

`cd my-project`

`npm run serve`

![vuex-schema](_readme-img/vue-install.PNG)



### Vue concepts

#### Components Basics

`v-model`: The v-model Vue directive allows us to create a two-way binding and so modify the value in two ways.

````vue
<input type="text" id="id-title" v-model="title" />
//...
    export default {
        data() {
            return {
            	title: "Lorem ipsum"
        }
    },
//...
}
````

- @submit.prevent: listener for submit. We use prevent to avoid the refreshing of all the page.

- v-for
-  Lifecycle hooks
-  vue vs component
-  @component
-  component declaration

## What is vueX?

Vuex is a **state management pattern + library** for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official [devtools extension](https://github.com/vuejs/vue-devtools) to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.

VueX is is like Redfux for React but with  special features for Vue.

![vuex-schema](_readme-img/vuex-schema.png)

- **Getters** will make values able to show statically in our templates. In other words, getters can read the value, but not mutate the state.
- **Mutations** (dispatched) will allow us to update the state, but they will always be synchronous. Mutations are the only way to change data in the state in the store.
- **Actions** (commited) will allow us to update the state, asynchronously, but will use an existing mutation. This can be very helpful if you need to perform a few different mutations at once in a particular order.

**store / index.js**

````js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
````

#### Exemple: Counter without VueX

**Counter.vue**

````vue
<template>
  <div>
    <h2>Counter</h2>
    <div>{{ currentValue }}</div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentValue: 0
      }
    },
    methods: {
      increment() {
        this.currentValue = this.currentValue +1;
      },
      decrement() {
        this.currentValue = this.currentValue -1;
      }
    },
  }
</script>
````

#### Exemple: Counter with VueX

**Counter.vue**

````vue
<template>
  <div>
    <h2>Counter</h2>
    <div>{{ currentValue }}</div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
  export default {
    methods: {
      increment() {
        this.$store.commit('INCREMENT_COUNTER');
      },
      decrement() {
        this.$store.commit('DECREMENT_COUNTER');
      }
    },
    computed: {
      currentValue() {
        return this.$store.state.currentValue;
      }
    },
  }
</script>
````

**store / index.js**

````js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentValue: 0
  },
  mutations: {
    //METHOD(state, payload)
    //Payload: other datas
    INCREMENT_COUNTER(state){
      state.currentValue +=1;
    },
    DECREMENT_COUNTER(state){
      state.currentValue -=1;
    },
  },
  actions: {
  },
  getters: {      
  },
  modules: {
  }
})
````

![vuex-schema](_readme-img/vue-dev-tool-01.PNG) 



![vuex-schema](_readme-img/vue-dev-tool-02.PNG) 

#### Exemple: log errors

````js
export default new Vuex.Store({
  state: {
    products: [],
    errors: []
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products;
    },
    GET_ERROR(state, error) {
      state.errors = [error, ...state.errors];
    }
  },
  actions: {
    getProducts({ commit }) {
      productService
        .getProducts()
        .then((res) => {
          commit("GET_PRODUCTS", res.data);
        })
        .catch((err) => {
          const error = {
            date: new Date(),
            message: `Failed to retrieve products: ${err.message}`,
          };
          commit("GET_ERROR", error);
        });
    }
  }
});
````

![vuex-schema](_readme-img/vue-dev-tool-03.PNG)


## Useful links

- [codeconcept / vuex-counter](https://github.com/codeconcept/vuex-counter)
- [codeconcept / vuex-ideas](https://github.com/codeconcept/vuex-ideas)
- [codeconcept / vuex-commerce](https://github.com/codeconcept/vuex-commerce)
- [Vue Development In 2019: What You Need To Know](https://vuejsdevelopers.com/2018/12/04/vue-js-2019-knowledge-map/)
- [Vue.js: Guide](https://v1.vuejs.org/guide/syntax.html)
- [How to map your VueX data to Vue models](https://dev.to/aminnairi/how-to-map-your-vuex-data-to-vue-models-2o6l)
- [Vuex, qu'est-ce que c'est ?](https://vuex.vuejs.org/fr/)
- [Intro to Vue.js: Vuex](https://css-tricks.com/intro-to-vue-4-vuex/)
- [Deploy Vue.js Application to GitHub Pages](https://www.mynotepaper.com/deploy-vue-app-to-github-pages)

