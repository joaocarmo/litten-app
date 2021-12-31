const auth = () => ({
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  currentUser: {
    delete: jest.fn(() => Promise.resolve(true)),
    uid: '',
    updateProfile: jest.fn(() => Promise.resolve(true)),
  },
  onAuthStateChanged: jest.fn(() => () => null),
  onUserChanged: jest.fn(() => () => null),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  signOut: jest.fn(() => Promise.resolve(true)),
})

export default auth
