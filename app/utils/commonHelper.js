import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';

/**
 * Author: TUANNA
 * @param objects
 * @param labelField (field or array field)
 * @param valueField
 * @param prefixLabel
 * @param prefixValue
 * @param allOption
 * @param fillObject
 * @returns {Array}
 */
export const convertListObjectToLookup = (objects, labelField, valueField, prefixLabel = null, prefixValue = null, allOption = false, fillObject = false) => {
  let newArrays = [];

  if (!isEmpty(objects) && isArray(objects)) {
    newArrays = reduce(objects, (result, object, key) => {
      let label = null;
      let value = null;

      if (isArray(labelField)) {
        const newlabel = [];
        labelField.forEach((field) => {
          if (object.hasOwnProperty(field)) {
            newlabel.push(object[field]);
          }
        });
        prefixLabel = prefixLabel || '';
        label = newlabel.join(prefixLabel);
      } else if (object.hasOwnProperty(labelField)) {
        label = object[labelField];
      }

      if (isArray(valueField)) {
        const newValue = [];
        valueField.forEach((field) => {
          if (object.hasOwnProperty(field)) {
            newValue.push(object[field]);
          }
        });
        prefixValue = prefixValue || '';
        value = newValue.join(prefixValue);
      } else if (object.hasOwnProperty(valueField)) {
        value = object[valueField];
      }

      const newOption = {
        label,
        value,
      };

      if (fillObject) {
        Object.assign(newOption, object);
      }

      return result.concat(newOption);
    }, []);
  }

  if (allOption) {
    newArrays.unshift({
      label: 'All',
      value: '-1',
    });
  }

  return newArrays;
};
