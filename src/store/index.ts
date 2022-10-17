import {configureStore} from "@reduxjs/toolkit";
import inisReducer from './slice';
import {
    persistReducer,
    persistStore,
    PURGE,
    PERSIST,
    PAUSE,
    FLUSH,
    KEY_PREFIX,
    REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'inis',
    storage
};

const persistedReducer = persistReducer(persistConfig, inisReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [PURGE, PERSIST, PAUSE, FLUSH, KEY_PREFIX, REHYDRATE]
        }
    })
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
