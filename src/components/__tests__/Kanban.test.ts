import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import KanbanBoard from '../KanbanBoard.vue';

describe('KanbanBoard', () => {
  it('debe cambiar tarea de columna al modificar status', async () => {
    const wrapper = mount(KanbanBoard);
    
    expect(wrapper.find('.column.todo').text()).toContain('Aprender DOM');
    
    const card = wrapper.find('.column.todo .card');
    await card.trigger('dragstart', { dataTransfer: { setData: () => {}, effectAllowed: '' } });
    
    const dropEvent = new Event('drop') as DragEvent;
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { getData: () => '1' }
    });
    wrapper.find('.column.done').element.dispatchEvent(dropEvent);
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.column.done').text()).toContain('Aprender DOM');
  });

  it('debe mover tarea con evento drop', async () => {
    const wrapper = mount(KanbanBoard);
    const columnaDone = wrapper.find('.column.done');
    
    const dropEvent = new Event('drop') as DragEvent;
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { getData: () => '1' }
    });
    
    columnaDone.element.dispatchEvent(dropEvent);
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.column.done').text()).toContain('Aprender DOM');
  });
});
