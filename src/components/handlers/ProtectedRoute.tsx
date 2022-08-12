import { ReactNode, useState } from 'react'
import { auth } from 'connectors/firebaseClient'
import { onAuthStateChanged, User } from 'firebase/auth'
import Custom403 from 'pages/403'
import FullScreenLoading from 'components/utils/FullScreenLoading'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  onAuthStateChanged(auth, (user) => setUser(user))

  if (user === undefined) {
    return <FullScreenLoading />
  } else if (user === null) {
    return <Custom403 />
  } else {
    return <>{children}</>
  }
}
