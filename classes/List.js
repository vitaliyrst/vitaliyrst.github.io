class Node {

    constructor(value) {
        this.data = value;
        this.previous = null;
        this.next = null;
    }

}


class List {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    add(value) {
        let node = new Node(value);

        if (this.length) {
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }

        this.length++;

        return node;
    }

    searchNode(position) {
        let currentNode = this.head;
        let length = this.length;
        let count = 1;
        let message = {failure: 'Failure: non-existent node in this list.'};

        // 1-ый случай: неверная позиция
        if (length === 0 || position < 1 || position > length) {
            throw new Error(message.failure);
        }

        // 2-ой случай: верная позиция
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode;
    }

    remove(position) {
        let currentNode = this.head;
        let length = this.length;
        let count = 1;
        let message = {failure: 'Failure: non-existent node in this list.'};
        let beforeNodeToDelete = null;
        let nodeToDelete = null;
        let deletedNode = null;

        // 1-ый случай: неверная позиция
        if (length === 0 || position < 1 || position > length) {
            throw new Error(message.failure);
        }

        // 2-ой случай: первый узел удален
        if (position === 1) {
            this.head = currentNode.next;

            // 2-ой случай: существует второй узел
            if (!this.head) {
                this.head.previous = null;
                // 2-ой случай: второго узла не существует
            } else {
                this.tail = null;
            }

            // 3-ий случай: последний узел удален
        } else if (position === this.length) {
            this.tail = this.tail.previous;
            this.tail.next = null;
            // 4-ый случай: средний узел удален
        } else {
            while (count < position) {
                currentNode = currentNode.next;
                count++;
            }

            let beforeNodeToDelete = currentNode.previous;
            let nodeToDelete = currentNode;
            let afterNodeToDelete = currentNode.next;

            beforeNodeToDelete.next = afterNodeToDelete;
            afterNodeToDelete.previous = beforeNodeToDelete;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
        }

        this.length--;

        return message.success;
    }
}

export {List};