import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@store/index'

/**
 * @description
 * redux + typescript 사용시의 기본 가이드를 따르고 있습니다.
 *
 * @example
 * 반드시 equlity function을 추가해서 과 렌더링 되는 것을 막아야 성능 누수를 차단할수 있습니다.
 * // Bad case
 * const { title, name } = useSelector(state => state.data)
 *
 * // Good case
 * const title = useSelector(state => state.data.title)
 * const name = useSelector(state => state.data.name)
 * // or
 * const { title, name } = useSelector(state => state.data, shallowEquals)
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
