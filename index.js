const objects = {};

const tangible = {
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
      } else if ((typeof component === 'object' || !component) && (!component?.name || !component?.quantity)) {
        // Component is an object, but does not have required properties
        throw new Error('Object components must have name and quantity properties that are a string and whole number respectively');
      }
    });

    objects[name] = {
      components,
      properties,
    };
  },
};

module.exports = tangible;
