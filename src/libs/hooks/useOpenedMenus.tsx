import { useRouter } from 'next/router'

export default function useOpenedMenus(): {
  openedFeature: string
  selectedPage: string
} {
  const router = useRouter()

  const featurePath = router.pathname.split('/dashboard/')[1]
  const featurePathNoParam = featurePath.split('/[id]')[0]
  const menuKeyPath = featurePathNoParam.split('/')

  switch (menuKeyPath.length) {
    case 1:
      return {
        openedFeature: '',
        selectedPage: menuKeyPath[0],
      }
    case 2:
      return {
        openedFeature: menuKeyPath[0],
        selectedPage: menuKeyPath[1],
      }
    default:
      return {
        openedFeature: '',
        selectedPage: '',
      }
  }
}
