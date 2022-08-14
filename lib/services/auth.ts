import Services from '@services/services'
import { ServiceError } from '@services/error'
import { actionCodeSettings } from '@config/auth'
import { parseAvatar } from '@utils/functions'
import { USE_GRAVATAR } from '@utils/env'
import { STORAGE_IGNORED_ERRORS, STORAGE_USER_AVATAR } from '@utils/constants'
import { logError } from '@utils/dev'
import type { BaseRecord } from '@db/firestore'
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface SignInOptions {
  email: string
  password: string
}

interface AuthProfile extends FirebaseAuthTypes.UpdateProfile, SignInOptions {}

export default class AuthService<
  T extends BaseRecord = BaseRecord,
> extends Services<T> {
  get storagePath(): string {
    const fileExt = 'jpg'

    if (this.currentUser()) {
      return `${STORAGE_USER_AVATAR}/${this.currentUserId()}.${fileExt}`
    }

    return ''
  }

  async create(data: AuthProfile) {
    const { email, password, ...profile } = data || {}

    if (!email || !password) {
      throw new ServiceError('Email and password are required to create')
    }

    await this.auth.createUserWithEmailAndPassword(email, password)

    await this.update(profile)
  }

  async update(data: Partial<AuthProfile>) {
    if (this.currentUser()) {
      const { email, password, photoURL, ...profile } = data || {}
      let uploadedPhotoURL: string

      if (email) {
        await this.currentUser().updateEmail(email)
      }

      if (password) {
        await this.currentUser().updatePassword(password)
      }

      if (photoURL || USE_GRAVATAR) {
        uploadedPhotoURL = await this.uploadPhoto(data)
      }

      await this.currentUser().updateProfile({
        ...profile,
        photoURL: uploadedPhotoURL || photoURL,
      })
    }
  }

  async uploadPhoto(data: Partial<AuthProfile>) {
    const { email, photoURL } = data || {}

    try {
      const storageRef = this.storageRef()
      const task = await storageRef.putFile(photoURL)

      if (task.state === 'success') {
        const downloadURL = await storageRef.getDownloadURL()

        return parseAvatar(downloadURL, {
          email,
        })
      } else {
        throw new ServiceError(task.error.message)
      }
    } catch (error) {
      if (STORAGE_IGNORED_ERRORS.includes(error.code)) {
        logError(error)
      } else {
        throw error
      }
    }

    return photoURL
  }

  deletePhoto() {
    if (this.currentUser()) {
      const storageRef = this.storageRef()

      try {
        return storageRef.delete()
      } catch (error) {
        if (STORAGE_IGNORED_ERRORS.includes(error.code)) {
          logError(error)
        } else {
          throw error
        }
      }
    }
  }

  delete() {
    if (this.currentUser()) {
      return this.currentUser().delete()
    }
  }

  currentUser() {
    return this.auth.currentUser
  }

  currentUserId() {
    return this.currentUser()?.uid || ''
  }

  currentUserPhotoUrl() {
    return this.currentUser()?.photoURL || ''
  }

  emailVerified() {
    return this.currentUser()?.emailVerified || false
  }

  signIn(options: SignInOptions) {
    const { email, password } = options || {}

    if (!email || !password) {
      throw new ServiceError('Email and password are required to sign in')
    }

    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signOut() {
    return this.auth.signOut()
  }

  sendPasswordResetEmail(options: Pick<SignInOptions, 'email'>) {
    const { email } = options || {}

    if (!email) {
      throw new ServiceError('Email is required to recover password')
    }

    return this.auth.sendPasswordResetEmail(email)
  }

  sendEmailVerification() {
    if (this.currentUser()) {
      return this.currentUser().sendEmailVerification(actionCodeSettings)
    }
  }

  applyActionCode(actionCode: string) {
    return this.auth.applyActionCode(actionCode)
  }

  checkActionCode(actionCode: string) {
    return this.auth.checkActionCode(actionCode)
  }

  reauthenticate(options: SignInOptions) {
    const { email, password } = options || {}

    if (!email || !password) {
      throw new ServiceError(
        'Email and password are required to reauthenticate',
      )
    }

    if (this.currentUser()) {
      const provider = this.AUTH_PROVIDER
      const authCredential = provider.credential(email, password)

      return this.currentUser().reauthenticateWithCredential(authCredential)
    }
  }
}
