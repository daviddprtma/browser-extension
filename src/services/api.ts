const BACKEND_URL = process.env.BACKEND_URL;

export interface SignupData {
  username: string;
  password: string;
  email?: string;
  displayName?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};