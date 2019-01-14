<template>
  <section id="app" class="section">
    <div class="container">
      <h1>Places to eat</h1>
      <div class="columns is-multiline">
        <div class="column is-12-touch is-7-desktop">
          <div class="field has-addons">
            <div class="control is-expanded">
              <input
                v-model="inputText"
                ref="taskInput"
                class="input is-medium"
                type="text"
                placeholder="Add a task..."
                @keyup.enter="addTask(inputText, 'user')"
              >
            </div>
            <div class="control">
              <button
                type="submit"
                class="button is-medium is-primary has-text-weight-semibold"
                @click="addTask(inputText, 'user')"
              >
                <span class="icon is-medium">
                  <i class="mdi mdi-24px mdi-plus"></i>
                </span>
                <span>Add task</span>
              </button>
            </div>
          </div>
        </div>
        <div class="column is-hidden-touch"/>
        <div class="column is-12-touch is-3-desktop">
          <div class="field">
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select v-model="sortSchema">
                  <option value="undefined">Sort: most recent</option>
                  <option value="name">Sort: name</option>
                  <option value="colour">Sort: colour</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Task
        @delete="removeTask(task)"
        v-for="task in sortedTasks"
        :key="task.name"
        :name="task.name"
        :colour="task.colour"
      />
    </div>
  </section>
</template>

<script>
import colours from "@/assets/colours";
import Task from "@/components/ToDoTask.vue";
export default {
  name: "todo",
  components: {
    Task
  },
  data() {
    return {
      inputText: undefined,
      colourIndex: undefined,
      sortSchema: undefined,
      tasks: new Array()
    };
  },
  computed: {
    sortedTasks() {
      // Proxy 'this' to avoid side-effects
      const vm = this;

      // If sort schema set, pass tasks array to sortTasks method
      if (vm.sortSchema == "name") {
        return vm.sortTasks("name");
      } else if (vm.sortSchema == "colour") {
        return vm.sortTasks("colour");
      }

      // If no sort schema, return original tasks array
      return vm.tasks;
    }
  },
  mounted() {
    // Populate app with sample tasks
    this.addTask("Dirty Bones", false);
    this.addTask("Blanchette", false);
    this.addTask("Chez Elles Bistroquet", false);
    this.addTask("Sticky Wings", false);
    this.addTask("Nha-Mor", false);
    this.addTask("Yuu Kitchen", false);
    this.addTask("E Pellicci", false);
    this.addTask("Sushi Samba", false);
    this.addTask("Ping Pong", false);
    this.addTask("Madame D", false);
    this.addTask("Azou", false);
    this.addTask("Alto", false);
    this.addTask("Passo", false);
    this.addTask("Arancini Factory", false);
    this.addTask("Flat Iron", false);
    this.addTask("Lure Fish Kitchen", false);
    this.addTask("Lord Palmerston", false);
  },
  methods: {
    addTask(name, isUser, err) {
      // Warn user if task name is empty
      if (!name) {
        this.$snackbar.open({
          message: `Task name can't be blank!`,
          type: "is-warning",
          position: "is-bottom"
        });

        err.preventDefault();
      }

      // Update colour index
      this.colourIndex < colours.length - 1
        ? this.colourIndex++
        : (this.colourIndex = 0);

      // Add new item to list
      this.tasks.push({
        name: name,
        colour: colours[this.colourIndex]
      });

      // Show snackbar for user-added tasks
      if (isUser) {
        this.$snackbar.open({
          message: `${name} added`,
          position: "is-bottom",
          actionText: "Undo",
          onAction: () => this.removeTask(name)
        });
      }

      // Clear the task input field
      this.inputText = undefined;

      // Set cursor focus to input field
      this.$refs.taskInput.focus();
    },
    removeTask(name) {
      // Get index of selected task
      const task = this.tasks.indexOf(name);

      // Remove selected task from tasks array
      return this.tasks.splice(task, 1);
    },
    sortTasks(prop) {
      // Set sort schema
      this.sortSchema = prop;

      // Clone original tasks array
      const tasks = this.tasks.slice(0);

      // Return new array sorted by prop argument (name/colour)
      return tasks.sort((a, b) =>
        a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
      );
    }
  }
};
</script>

<style lang="scss">
$mdi-font-path: "~@mdi/font/fonts";

@import "~@mdi/font/scss/materialdesignicons";
@import "~bulma/sass/utilities/all";
@import "~bulma/sass/base/all";
@import "~bulma/sass/grid/columns";
@import "~bulma/sass/layout/section";
@import "~bulma/sass/elements/container";
@import "~bulma/sass/elements/form";
@import "~bulma/sass/elements/icon";
@import "~bulma/sass/elements/button";

@import "~bulma";
@import "~buefy/src/scss/buefy";

h1 {
  font-size: $size-1;
  font-weight: $weight-bold;
  margin-bottom: $size-1 * 0.66;
}
</style>
