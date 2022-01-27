import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { isServer } from '@lib/index'
import { PersistGate } from 'redux-persist/integration/react'
import type { Persistor } from 'redux-persist'
import type { Reducer, Store } from '@reduxjs/toolkit'
import type { IState } from '@slices/index'

const persistConfig = {
	key: 'root', // key명은 변경해서 사용하세요
	version: 1,
	storage,
}

export const PersistGateForSSR: React.FC<{ persistor: Persistor }> = (
	props,
) => {
	if (isServer) {
		return <>{props.children}</>
	} else {
		return (
			<PersistGate loading={null} persistor={props.persistor}>
				{props.children}
			</PersistGate>
		)
	}
}

export const actionTypes = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
export let createPersistor = (store: Store) => persistStore(store)
export const createPersistedReducer = (slice: Reducer<IState>) =>
	persistReducer(persistConfig, slice)
