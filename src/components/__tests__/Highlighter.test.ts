import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TextHighlighter from '../TextHighlighter.vue';

describe('TextHighlighter', () => {
    it('debe subrayar texto seleccionado', async () => {
        const wrapper = mount(TextHighlighter);
        
        const contentArea = wrapper.vm.$el.querySelector('[ref="contentArea"]') || 
                            wrapper.vm.$el.querySelectorAll('div')[1];
        
        contentArea.textContent = 'Texto';
        
        const range = document.createRange();
        range.selectNodeContents(contentArea);
    
    const mockSelection = {
        rangeCount: 1,
        getRangeAt: () => range,
        toString: () => 'Texto',
        removeAllRanges: vi.fn()
    };
    
        vi.stubGlobal('getSelection', () => mockSelection);
        
        await wrapper.find('button[aria-label="Subrayar"]').trigger('click');
        await wrapper.vm.$nextTick();
        
        const span = contentArea.querySelector('.highlight-yellow');
        expect(span).toBeTruthy();
    });
});
