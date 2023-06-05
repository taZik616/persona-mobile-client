import {useEffect} from 'react'

import {getGenericPassword} from 'react-native-keychain'

import {useTypedDispatch} from 'src/store'
import {onSuccessfulLogin} from 'src/store/profileSlice'
import {useLoginMutation} from 'src/store/shopApi'

export function useAutoLogin() {
  const [login] = useLoginMutation()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      const credentials = await getGenericPassword()
      if (credentials) {
        const {username, password} = credentials
        const res: any = await login({username, password})

        const token = res?.data?.token
        if (token) {
          dispatch(
            onSuccessfulLogin({
              token,
            }),
          )
        }
      }
    }
    tryLogin()
  }, [])
}
