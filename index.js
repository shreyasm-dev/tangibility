const objects = {};

const tangible = {
  registerBasicObject: (name, properties = {}) => {
    if (typeof name !== 'string' || !name) {
      // name is not a string or is an empty string
      throw new Error('Required parameter "name" must be a non-empty string');
    } else if (typeof properties !== 'object' || !properties) {
      // properties is not an object or is null (!{} is false)
      throw new Error('Optional parameter "properties" must be an object');
    } else if (objects[name]) {
      throw new Error('Component with given name already exists');
    }

    objects[name] = {
      properties,
    };
  },
  registerObject: (name, components, properties = {}) => {
    if (typeof name !== 'string' || !name) {
      // name is not a string or is an empty string
      throw new Error('Required parameter "name" must be a non-empty string');
    } else if (!Array.isArray(components) || components.length < 1) {
      // components is not an array or is empty
      throw new Error('Required parameter "components" must be a non-empty array of strings and/or objects');
    } else if (typeof properties !== 'object' || !properties) {
      // properties is not an object or is null (!{} is false)
      throw new Error('Optional parameter "properties" must be an object');
    } else if (objects[name]) {
      throw new Error('Component with given name already exists');
    }

    components.forEach((component) => {
      if (!['object', 'string'].includes(typeof component) || !component) {
        // Components are not strings or objects
        throw new Error('Components must be strings or objects');
      } else if (typeof component === 'object') {
        // Component is an object
        if ((typeof component.name !== 'string' || !component.name) || (!Number.isInteger(component.quantity) || !component.quantity)) {
          throw new Error('Object components must have name and quantity properties that are a string and whole number respectively');
        } else if (!objects[component.name]) {
          throw new Error('Component doesn\'t exist');
        }
      } else if (typeof component === 'string' && !objects[component]) {
        throw new Error('Component doesn\'t exist');
      }
    });

    objects[name] = {
      components,
      properties,
    };
  },
};

module.exports = tangible;
