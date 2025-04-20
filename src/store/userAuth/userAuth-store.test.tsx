import { User } from '@supabase/supabase-js';
import { userAuthStore } from './userAuth-store';

describe('userAuthStore', () => {
  beforeEach(() => {
    userAuthStore.setState({ userData: null });
  });

  it('userData must be null', () => {
    expect(userAuthStore.getState().userData).toBeNull();
  });

  it('Changing store values', () => {
    const mockUser = {
      id: 'testID',
    } as User;

    userAuthStore.getState().setUser(mockUser);
    expect(userAuthStore.getState().userData?.id).toBe(mockUser.id);

    userAuthStore.getState().setUser(null);
    expect(userAuthStore.getState().userData).toBeNull();
  });
});
