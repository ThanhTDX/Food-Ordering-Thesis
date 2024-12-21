// Load specific part of the state (in this case, counter) from localStorage
export const loadCart = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined; // Return undefined if no state is found
    }
    return JSON.parse(serializedState); // Parse the saved state
  } catch (err) {
    console.error("Could not load cart from localStorage", err);
    return undefined; // Return undefined if an error occurs
  }
};

// Save specific part of the state (in this case, counter) to localStorage
export const saveCart = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState); // Save the state as JSON
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
  }
};

// Load custommenufrom localStorage
export const loadCustomMenu = () => {
  try {
    const serializedState = localStorage.getItem("customMenu");
    if (serializedState === null) {
      return undefined; // Return undefined if no state is found
    }
    return JSON.parse(serializedState); // Parse the saved state
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined; // Return undefined if an error occurs
  }
};

// Save specific part of the state (in this case, counter) to localStorage
export const saveCustomMenu = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("customMenu", serializedState); // Save the state as JSON
  } catch (err) {
    console.error("Could not save customMenu to localStorage", err);
  }
};

// Load user of the state (in this case, counter) from localStorage
export const loadUser = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) {
      return undefined; // Return undefined if no state is found
    }
    return JSON.parse(serializedState); // Parse the saved state
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined; // Return undefined if an error occurs
  }
};
