import { Combo } from './Combo'
import SuspenseFallbackLogo from '@/shared/ui/lib/SuspenseFallbackLogo'

export function CombosList ({ categoryProductList, isLoading }) {
  return (
    <ul style={{
      height: `${categoryProductList.length > 1 ? '28rem' : '16rem'}`
    }}
    >
      <SuspenseFallbackLogo
        isLoading={isLoading} height={100} logoStyle={{
          fill: '#fff',
          fillOpacity: 0.9
        }}
      >
        {categoryProductList.length > 0 && categoryProductList.map(combo => {
          return (
            <Combo
              key={combo.id}
              combo={combo}
              height={categoryProductList.length > 1 ? '50%' : '100%'}
            />
          )
        })}
      </SuspenseFallbackLogo>
    </ul>
  )
}
